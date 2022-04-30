import {empty} from "@u2/utils";

// todo DELETE


type State = {
    name: string
    group: string
    back: 'none'|'default'|State
}
type Action = {
    type: 'add'|'replace'|'remove'|'back'
    state?: State|empty
}

class AppStateManager {
    private stack = [] as State[]


    public getGroupState(group: string){
        const s = this.stack
        for (let i = s.length-1; i >= 0; i--) {
            if (s[i].group===group) return s[i].name
        }
        return undefined
    }


    public next(action: Action){
        const s = this.stack
        switch (action.type){
            case 'add': action.state && s.push(action.state); break
            case 'replace': {
                let i
                action.state
                && (i = s.reverse().findIndex(val=>val.group===action.state?.group)) >= 0
                && (s[i] = action.state)
                break
            }
            case 'remove': {
                let i
                (i = s.reverse().findIndex(val=>val.group===action.state?.group)) >= 0
                && (this.stack = s.slice(0,i))
                break
            }
            case 'back': {
                
            }
        }
    }


}



/*
    after: поиск по стеку ближайших, что содержатся в массиве, удаление стека после них и помещение туда текущего
    если в стеке не найдено, то ничего не происходит

    вместо back наверное лучше просто удалить из стека
 */


const settings = {
    name: 'settings',
    group: 'settings',
    after: undefined,
    back: undefined
}


const filters = {
    name: 'filters',
    group: 'filters',
    after: ['map','search'],
    back: undefined
}