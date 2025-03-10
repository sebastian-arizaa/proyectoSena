import { BaseLayout } from '../componentes/layouts/BaseLayout';
import { ContentLayout } from '../componentes/layouts/ContentLayout';
import { MenuContainer } from '../componentes/MenuContainer';

export function CerraSesion() {
  return (
    <BaseLayout>
      <ContentLayout>
        <MenuContainer/>
        <div>CerraSesion</div>
      </ContentLayout>
    </BaseLayout>

  )
}
