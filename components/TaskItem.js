import { Text, View, StyleSheet  } from 'react-native';
import CheckBox from './CheckBox';
import React from 'react';
import { TaskType } from '../types';

const Props = {
    item:TaskType
}

const TaskItem = ({item}) => {
    return(
        <View key={item.id} style={styles.taskItem}>
            <Text>{item.name}</Text>
            <CheckBox value={!!item.completedAt}/>
        </View>
    )
}

export default TaskItem;

const styles =StyleSheet.create({
    taskItem: {
        flexDirection: 'row',
    }
})