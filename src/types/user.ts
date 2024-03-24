import { AlertColor, SnackbarOrigin } from "@mui/material";

interface DialogSetting extends SnackbarOrigin {
	open: boolean;
	severity: AlertColor | undefined;
}
export interface InitialUserState {
  userAuth: boolean;
  userId: null | number;
  userName: null | string;
  message: string;
  dialogSetting: DialogSetting;
}