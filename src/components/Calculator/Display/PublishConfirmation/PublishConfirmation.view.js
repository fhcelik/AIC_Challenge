import PublishIcon from '@material-ui/icons/Publish';
import PublishIconOutlined from '@material-ui/icons/PublishOutlined';
import React from 'react';
import DropdownMenu from '../../../DropdownMenu';
import IconButton from '../../../IconButton';
import PublishConfirmationContent from './PublishConfirmationContent';

const PublishConfirmation = () => (
  <DropdownMenu
    offset="22px, 3px"
    placement="bottom-end"
    hasIcon={false}
    keepOpen
    withPropsToChildren
    target={
      <IconButton iconOnHover={PublishIcon} tooltipTitle="Publish">
        <PublishIconOutlined />
      </IconButton>
    }
  >
    <PublishConfirmationContent />
  </DropdownMenu>
);

export default PublishConfirmation;
