import { Routes } from '@angular/router';
import { MasterUIComponent } from './body-view/Content/exerciser-view/Master-Slave-UI/master-ui/master-ui.component';
import { BusConfigurationComponent } from './body-view/Content/exerciser-view/bus-configuration/bus-configuration.component';
import { SlaveUIComponent } from './body-view/Content/exerciser-view/Master-Slave-UI/slave-ui/slave-ui.component';
import { MasterScriptComponent } from './body-view/Content/exerciser-view/Master-Slave-Script/master-script/master-script.component';
import { SlaveScriptComponent } from './body-view/Content/exerciser-view/Master-Slave-Script/slave-script/slave-script.component';

export const routes: Routes = [


    {
        path:'BusConfig',
        component:BusConfigurationComponent
    },
    {
        path:'Master-UI',
        component: MasterUIComponent
    },
    {
        path:'Slave-UI',
        component:SlaveUIComponent
    },
    {
        path:'Master-Script',
        component: MasterScriptComponent
    },
    {
        path:'Slave-Script',
        component:SlaveScriptComponent
    }
];
