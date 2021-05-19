import React, { Fragment, useEffect, useState } from 'react';


import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../API/agent';
import LoadingComponent from './LoadingComponent';


function App() {

  const [activities, setActivites] = useState<Activity[]>([]);
  const[selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const[editMode, setEditMode] = useState(false);
  const[loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);


  useEffect(() => {
    agent.Activites.list().then(response => {
      let activites : Activity[] = [];
      response.forEach((activity: Activity) => {
        activity.date = activity.date.split('T')[0];
        activites.push(activity);
      } )

    setActivites(activites);
    setLoading(false);
    })
  },[])


  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id? :string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }
  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity : Activity) {
    setSubmitting(true);
    if(activity.id) {
      agent.Activites.update(activity).then(() => {
         setActivites([...activities.filter(x => x.id !== activity.id), activity])
         setSelectedActivity(activity);
         setEditMode(false);
         setSubmitting(false);


      })
    }

    else {
      activity.id = uuid();
      agent.Activites.create(activity).then(() => {
       setActivites([...activities,  activity ]);
       setSelectedActivity(activity);
       setEditMode(false);
       setSubmitting(false);
       
      })
    }

  }

  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activites.delete(id).then(() => {
    setActivites([...activities.filter(x => x.id !== id)]);
    setSubmitting(false);


    })

  }


  if(loading) {
    return <LoadingComponent content='Loading app' /> 

  }


  return (
    <Fragment>
      
      <NavBar openForm ={handleFormOpen} />
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard  activites={ activities}  selectedActivity={selectedActivity} selectActivity={handleSelectActivity}
        cancelSelectActivity = {handleCancelSelectActivity}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        createOrEdit={handleCreateOrEditActivity}
        deleteActivity = {handleDeleteActivity}
        submitting = {submitting}
        />

      </Container>

      
    </Fragment>
  );
}

export default App;
