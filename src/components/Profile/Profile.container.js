import * as R from 'ramda';
import { connect } from 'react-redux';
import {
  branch,
  compose,
  renderNothing,
  withHandlers,
  withProps,
  withState,
  withStateHandlers,
} from 'recompose';
import { saveProfile } from '../../redux/actions/users';
import { loggedInUserSelector } from '../../redux/selectors/auth';
import Profile from './Profile.view';

export default compose(
  connect(
    (state, props) => ({
      user: loggedInUserSelector(state, props),
    }),
    {
      saveProfile,
    }
  ),
  branch(({ user }) => !user, renderNothing),
  withState('isLoading', 'setIsLoading', false),
  withStateHandlers(({ user }) => ({ ...user }), {
    onChangeFullName: () => evt => ({ fullName: evt.target.value }),
    onChangeRole: () => evt => ({ role: evt.target.value }),
    onChangeCompany: () => evt => ({ company: evt.target.value }),
  }),

  withProps(({ isLoading, fullName, role, company, user }) => ({
    isSubmitDisabled:
      isLoading ||
      R.allPass([
        R.propEq('fullName', fullName),
        R.propEq('role', role),
        R.propEq('company', company),
      ])(user),
  })),

  withHandlers({
    onSubmit: ({
      company,
      fullName,
      role,
      saveProfile,
      setIsLoading,
      user,
    }) => () => {
      setIsLoading(true);
      saveProfile({ ...user, fullName, role, company })
        .catch(err => {
          if (R.pathEq(['response', 'status'], 400, err)) {
            console.log(err.response.data.validationErrors);
          }
        })
        .finally(() => setIsLoading(false));
    },
  })
)(Profile);
