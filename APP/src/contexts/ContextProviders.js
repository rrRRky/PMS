import React from 'react';
import { ControlTypeProvider } from './LookupControlTypeContext';
import { SpaceProvider } from './SpaceContext';
import { ControlIDProvider } from './lookupControlIdContexr';
import { UserProvider } from './UserContext';
import { SpaceListProvider } from './SpaceListContext';
import { PriorityProvider } from './LookupPriorityContext';
import { TemplateIdProvider } from './lookupTemplateIdContext';
import { ValueTypeIdProvider } from './lookupValueTypeIdContext';
import { UserLoginDetailProvider } from './userLoginDetail.context';
import { RoleIdProvider } from './lookupRoleIdVisible';
import { StageProvider } from './StageContext';
import { ModuleCategoryProvider } from './ModuleCategoryContext';
import { ControlProvider } from './ControlContext';

const ContextProviders = ({ children }) => (
  <UserLoginDetailProvider>
    <UserProvider>
      <PriorityProvider>
        <ModuleCategoryProvider>
          <StageProvider>
            <ControlProvider>
              <ControlTypeProvider>
                <SpaceListProvider>
                  <SpaceProvider>
                    <RoleIdProvider>
                      <ValueTypeIdProvider>
                        <TemplateIdProvider>
                          <ControlIDProvider>
                            {children}
                          </ControlIDProvider>
                        </TemplateIdProvider>
                      </ValueTypeIdProvider>
                    </RoleIdProvider>
                  </SpaceProvider>
                </SpaceListProvider>
              </ControlTypeProvider>
            </ControlProvider>
          </StageProvider>
        </ModuleCategoryProvider>
      </PriorityProvider>
    </UserProvider>
  </UserLoginDetailProvider>
);

export default ContextProviders;
