import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../app/models/activity';
import NavBar from './navbar';
import ActivityDashboard from '../feature/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../app/api/agent';
import LoadingComponent from './loadingComponent';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined >(undefined); //can be an activity or undefined
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);


  useEffect(() => { 
    agent.Activities.list().then(response => { 
      let activities: Activity[] = [];
      response.forEach(activity=> {
        activity.date = activity.date.split('T')[0]; //split on T and take the first part of array made by split
        activities.push(activity); //addes new element to array

      })
        setActivities(activities);
        setLoading(false);
      })
  }, [])

function handleDeleteActivity(id: string) {
  setSubmitting(true);
  agent.Activities.delete(id).then(() => {
    setActivities([...activities.filter(x => x.id !== id)]);
    setSubmitting(false);
  });
   //expand activites
}
  
function handleSelectActivity(id: string){
  setSelectedActivity(activities.find(x => x.id === id));
}

function handleCancelSelectActivity() {
  setSelectedActivity(undefined);
}

function handleFormOpen(id?: string) {
  id? handleSelectActivity(id) : handleCancelSelectActivity();
  setEditMode(true);
} //? means optional

function handleFormClose() {
  setEditMode(false);
}

function handleCreateOrEditActivity(activity: Activity) {
  setSubmitting(true);
  if (activity.id) {
    agent.Activities.update(activity).then(() => {
      setActivities([...activities.filter(x => x.id !== activity.id), activity])
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmitting(false);
    })
  } else {
    activity.id = uuid();
    agent.Activities.create(activity).then(() =>{
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmitting(false);
    })
  }  
}

if (loading) return <LoadingComponent content='Loading App' />

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}  
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose} 
          createOrEdit={handleCreateOrEditActivity}       
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          />
      </Container>

    </>
  );
}

export default App;
