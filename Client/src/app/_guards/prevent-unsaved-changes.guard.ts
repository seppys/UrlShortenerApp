import { CanDeactivateFn } from '@angular/router';
import { EditUserComponent } from '../users/edit/edit-user/edit-user.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<EditUserComponent> = (component, currentRoute, currentState, nextState) => {
  const result = component.canDeactivate();
  return result;
};

