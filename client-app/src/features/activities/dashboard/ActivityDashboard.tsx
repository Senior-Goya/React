import React from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActvityDetails from '../details/ActivityDetails';
import ActivityForm from '../forn/ActivityFom';
import ActivityList from './ActivityList';

interface Props {
    activites: Activity[];
    selectedActivity : Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity : () => void;
    editMode: boolean;
    openForm:(id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity:(id: string) => void;


}

export default function ActivityDashboard({activites,selectedActivity,selectActivity,deleteActivity,cancelSelectActivity, editMode, openForm, closeForm, createOrEdit}: Props){

    return(
        <Grid> 
            <Grid.Column width='10'>
              <ActivityList activites = {activites} selectActivity={selectActivity} deleteActivity={deleteActivity}/>
            </Grid.Column>
            <GridColumn width='6'>
              {selectedActivity && !editMode && 
                <ActvityDetails activity={selectedActivity} cancelSelectActivity={cancelSelectActivity}
                openForm = {openForm}
                />
              }
              {
                editMode &&
                   <ActivityForm closeForm={closeForm} activity={selectedActivity}  createOrEdit={createOrEdit}/>
              }
            </GridColumn>
       
        </Grid>
    )
}