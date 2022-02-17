import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useTheme } from '@h';

const makeStyles = (theme, style) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.backgroundColor.mainColor,
        ...style
    }
});

function Container({ children, style = {}, ...props }) {
    const styles = useTheme(theme => makeStyles(theme, style), [style]);

    return (
        <SafeAreaView
            style={styles.container}
            {...props}
        >
            {children}
        </SafeAreaView>
    )
}

export { Container };