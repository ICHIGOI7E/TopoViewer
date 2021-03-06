import service from './service';

export function postTopoData(data: FormData) {
    return service({
        url: 'upload',
        method: 'post',
        data: data
    })
}

export function getInterval(params: {xAlarm: boolean}) {
    return service({
        url: 'switch',
        method: 'get',
        params: {...params, t: Date.now()}
    })
}
export function getGroupIdsDataByInterval(params: { start: string, end: string, xAlarm: boolean }) {
    return service({
        url: 'interval',
        method: 'get',
        params
    })
}

export function getAlarmDatas(params: { groupId?: string, addCondition?: number, addValue?: string, xAlarm: boolean }) {
    return service({
        url: 'analyze',
        method: 'get',
        params: {...params, t: Date.now()}
    })
}

export function getExpandAlarmDatas(params: { groupId: string, addTime: number, xAlarm: boolean }) {
    return service({
        url: 'expand',
        method: 'get',
        params
    })
}

export function confirmAlarmDatas(groupId: string, data: { row: number[], columns: string[][], values: string[][] }) {
    return service({
        url: 'confirm',
        method: 'post',
        params: { groupId },
        data
    })
}

export function getStaticsGroupData(params: {xAlarm: boolean}) {
    return service({
        url: 'detail',
        method: 'get',
        params
    })
}

export function exportAlarmData() {
    return service({
        url: `export?${Date.now()}`,
        method: 'get'
    })
}

export function oneConfirm(params: {xAlarm: boolean}) {
    return service({
        url: `oneClick`,
        method: 'post',
        params
    })
}

export function checkId(groupId: string) {
    return service({
        url: 'checkId',
        method: 'get',
        params: {curId: groupId}
    })
}

export function clear(data: {clientId: string}) {
    return service({
        url: 'cleanUp',
        method: 'post',
        data
    })
}