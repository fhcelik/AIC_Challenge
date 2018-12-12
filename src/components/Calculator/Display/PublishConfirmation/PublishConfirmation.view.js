import PublishIcon from '@material-ui/icons/Publish';
import React from 'react';
import DropdownMenu from '../../../DropdownMenu';
import HeaderButton from '../../HeaderButton';
import PublishConfirmationContent from './PublishConfirmationContent';

const PublishConfirmation = () => (
  <DropdownMenu
    offset="22px, 3px"
    placement="bottom-end"
    hasIcon={false}
    keepOpen
    withPropsToChildren
    target={<HeaderButton icon={PublishIcon} tooltipTitle="Publish" />}
  >
    <PublishConfirmationContent />
  </DropdownMenu>
);

export default PublishConfirmation;
