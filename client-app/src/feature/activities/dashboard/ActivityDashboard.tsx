import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

export default observer(function ActivityDashboard() {

    const { activityStore } = useStore();
    const { selectedActivity, editMode } = activityStore; // destructure properties from activity store

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode && //only execute if not null and not in edit mode
                    <ActivityDetails />}
                {editMode &&
                    <ActivityForm /> }
            </Grid.Column>
        </Grid>
    )
})