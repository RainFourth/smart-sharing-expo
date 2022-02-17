import React, {
    useState, useCallback,
    useEffect, forwardRef,
    useImperativeHandle
} from 'react';
import { VirtualizedList, RefreshControl } from 'react-native';

function InfiniteScroll({
    onScroll, onRefresh, getPartData, limit,
    loadAfterPercs = 0.6, style,
    ...props
}, ref) {
    const [data, setData] = useState([]);

    const [oldContentHeight, setOldContentHeight] = useState(0);
    const [loadData, setLoadData] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [aborted, setAborted] = useState(false);

    const [options, setOptions] = useState({
        total: 0,
        limit,
        offset: 0
    });

    const addToTop = (item) => {
        setData(prev => {
            prev.unshift(item);

            return prev;
        })

        let offset = options.offset;
        if (options.offset > 1) offset += 1;

        setOptions(prev => ({
            ...prev,
            total: prev.total + 1,
            offset
        }))
    }

    const del = (id) => {
        let len = 0;

        setData(prev => {
            prev = prev.filter(el => el.id !== id)
            len = prev.length;

            return prev;
        });

        let offset = options.offset;
        if (options.offset > 1) offset -= 1;

        setOptions(prev => ({
            ...prev,
            total: prev.total - 1,
            offset
        }))

        return len;
    }

    useImperativeHandle(ref, () => ({
        addToTop,
        del,
        refresh: onRefresh_
    }), [])

    const onScroll_ = useCallback(async (event) => {
        if (aborted) return;
        if (onScroll) onScroll(event);

        const { nativeEvent } = event;

        const contentHeight = nativeEvent.contentSize.height;
        const offset = nativeEvent.contentOffset.y / (contentHeight - nativeEvent.layoutMeasurement.height);

        if (
            offset > loadAfterPercs &&
            contentHeight > oldContentHeight &&
            options.total !== 0 &&
            data.length !== options.total
        ) {
            setOptions((prev) => ({
                ...prev,
                offset: data.length
            }));
            setLoadData(true);
            setOldContentHeight(contentHeight);
        }
    }, [onScroll, loadAfterPercs, oldContentHeight, options, data])

    const getPartData_ = useCallback(async () => {
        const [error, partData, total] = await getPartData(options);

        if (error === false) {
            setAborted(true);
            setLoadData(false);
            setRefreshing(false);
            return;
        }

        setData([...data, ...partData]);
        if (options.total === 0)
            setOptions((prev) => ({ ...prev, total }))

        setLoadData(false);
        setRefreshing(false);
    }, [options])

    useEffect(() => {
        if (loadData && !aborted)
            getPartData_();
    }, [loadData, aborted])

    const onRefresh_ = useCallback(async () => {
        if (onRefresh) onRefresh();

        setRefreshing(true);
        setData([]);
        setOptions({
            total: 0,
            limit
        });
        setOldContentHeight(0);
        setLoadData(true);
        setAborted(false);
    }, [limit])

    // TODO data.length === 0 Component
    // TODO load spinner in bottom
    // TODO aborted Component
    return (
        <VirtualizedList
            style={style}
            data={data}
            initialNumToRender={limit}
            onScroll={onScroll_}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh_} />}
            {...props}
        />
    )
}

InfiniteScroll = forwardRef(InfiniteScroll);

export { InfiniteScroll };