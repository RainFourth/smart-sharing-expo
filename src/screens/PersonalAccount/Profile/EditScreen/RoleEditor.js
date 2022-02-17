import React from 'react';
import { View, Text } from 'react-native';

function RoleEditor({
    value = null
}) {
    return (
        <View>
            <Text>Роль</Text>
            <Text>{value}</Text>
        </View>
    )
}

export { RoleEditor }