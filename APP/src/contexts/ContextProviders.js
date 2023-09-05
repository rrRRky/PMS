import React from 'react';
import { ControlTypeProvider } from './LookupControlTypeContext';
import { SpaceProvider } from './SpaceContext';
import { ControlIDProvider } from './lookupControlIdContexr';
import { TemplateIdProvider } from './lookupTemplateIdContext';
import { ValueTypeIdProvider } from './lookupValueTypeIdContext';
import { RoleIdProvider } from './lookupRoleIdVisible';
import { StageProvider } from './StageContext';

const ContextProviders = ({ children }) => (
  <StageProvider>
    <ControlTypeProvider>
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
    </ControlTypeProvider>
  </StageProvider>
);

export default ContextProviders;
