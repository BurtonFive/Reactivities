import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../app/models/activity';
import NavBar from './navbar';
import ActivityDashboard from '../feature/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined >(undefined); //can be an activity or undefined
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities') //get array of activities
      .then(response => {
        setActivities(response.data)
      })
  }, [])

function handleDeleteActivity(id: string) {
  setActivities([...activities.filter(x => x.id !== id)])
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
  activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
    : setActivities([...activities, {...activity, id: uuid()}]); //create new GUID with UUID
    setEditMode(false);
    setSelectedActivity(activity);
}

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
          />
      </Container>

    </>
  );
}

export default App;
