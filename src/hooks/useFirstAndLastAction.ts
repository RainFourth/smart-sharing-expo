import {useEffect, useState} from "react";


export const useFirstAndLastAction = <D> (initialData: D, sendAndGetSuccess: (data: D)=>Promise<boolean>) => {

    const [data,setData] = useState(initialData)

    const [resultBackup, setResultBackup] = useState(undefined as undefined|D)
    const [resultToCheck, setResultToCheck] = useState(undefined as undefined|D)
    const [updateCnt, setUpdateCnt] = useState(0)
    const [updateStatus, setUpdateStatus] = useState(undefined as undefined|boolean)



    const setNewData = (newData: D) => {
        if (updateCnt===0) {
            setResultBackup(data)
            setResultToCheck(newData)
        }
        setUpdateCnt(updateCnt+1)
        setData(newData)
    }



    const onUpdate = async () => {
        if (updateCnt===1){
            const success = await sendAndGetSuccess(resultToCheck!)
            setUpdateStatus(success)
        }
    }
    useEffect(()=>{onUpdate()},[updateCnt])



    const onUpdateResult = () => {
        //console.log("updateCnt: ", updateCnt)
        //console.log("updateResult: ", updateResult)
        if (updateStatus===true){
            if (updateCnt===1){
                setUpdateCnt(0)
                setUpdateStatus(undefined)
                setResultBackup(undefined)
                setResultToCheck(undefined)
            } else if (updateCnt > 1){
                setUpdateCnt(1)
                setUpdateStatus(undefined)
                setResultBackup(resultToCheck)
                setResultToCheck(data)
            }
        } else if (updateStatus===false){
            if (updateCnt===1){
                setUpdateCnt(0)
                setData(resultBackup!)
                setResultBackup(undefined)
                setUpdateStatus(undefined)
                setResultToCheck(undefined)
            } else if (updateCnt > 1){
                setUpdateCnt(1)
                setUpdateStatus(undefined)
                //setResultBackup(resultBackup)
                setResultToCheck(data)
            }
        }
    }
    useEffect(()=>{onUpdateResult()},[updateStatus])



    return [data, setNewData] as [D, (newData: D)=>void]
}