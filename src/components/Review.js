import React, { useMemo } from 'react';
import {
    View, Text,
    StyleSheet
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import { Rating } from '@c';
import { Datee, datee } from '@u';
import { useTheme, useThemeObj } from '@h';

const datee_ = datee.instance;
const fromMSK = (timestamp) => datee_.setTimestamp(timestamp, 'MSK');

const makeStyles = (theme) => StyleSheet.create({
    main: {
        marginTop: 40
    },
    header: {
        flexWrap: 'wrap',
        height: 22,
        alignContent: 'space-between',
        justifyContent: 'center'
    },
    name: {
        fontFamily: theme.font.family,
        letterSpacing: theme.review.letterSpacing,
        color: theme.review.textColor,
        fontWeight: 'bold',
        fontSize: 13,
        marginLeft: 20,
        width: 150
    },
    description: {
        fontFamily: theme.font.family,
        letterSpacing: theme.review.letterSpacing,
        color: theme.review.textColor,
        marginTop: 16,
        fontSize: 15
    },
    date: {
        fontFamily: theme.font.family,
        letterSpacing: theme.review.dateLetterSpacing,
        color: theme.review.dateColor,
        fontSize: 10,
        marginTop: 8
    },
    avatarView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatarBackground: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: theme.review.avatar.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

function Review({
    user, description,
    createAt, rating
}) {
    const styles = useTheme(theme => makeStyles(theme), []);
    const theme = useThemeObj();

    const date = useMemo(() => fromMSK(createAt).toString('dateTime'), [createAt]);

    description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eleifend dictum mi ut lacinia. Morbi laoreet mattis volutpat. In vitae felis at nunc blandit luctus. Etiam ut semper enim. Etiam bibendum mi risus, in tristique metus tristique at. Integer eget nibh finibus, congue nibh vel, rutrum dui. Morbi laoreet dictum nisi, nec volutpat nisi blandit vitae. Mauris efficitur interdum justo, et aliquet ligula fringilla ac. Nunc a est eget enim ullamcorper auctor. Nunc vehicula leo ut mi porttitor, vitae feugiat lectus feugiat. Cras placerat enim lacus. Cras vulputate mauris ipsum, id euismod diam blandit ac. Praesent ultrices blandit dui. Aenean lobortis eget nisi in imperdiet.'

    return (
        <View style={styles.main}>
            <View style={styles.header}>
                <View style={styles.avatarView}>
                    <View style={styles.avatarBackground}>
                        <Feather
                            name='user'
                            color={theme.review.avatar.iconColor}
                            size={24}
                        />
                    </View>
                    <View>
                        <Text
                            style={styles.name}
                            ellipsizeMode='tail'
                            numberOfLines={1}
                        >
                            {user.name}
                        </Text>
                        <Text
                            ellipsizeMode='tail'
                            numberOfLines={1}
                            style={styles.name}
                        >
                            {user.surname}
                        </Text>
                    </View>
                </View>
                <Rating
                    rating={rating}
                />
            </View>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.date}>{date}</Text>
        </View>
    )
}

export { Review };