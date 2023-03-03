import Store from './Store';
import LocalStorage from './LocalStorage';
import Directory from './Directory';

const StoreMan = {
    saveDirectory: async (dir, isLogged) => {
        if (isLogged) {
            Store.save(dir);
        } else {
            LocalStorage.saveDirectory(dir);
        }
    },

    setedDirectories: (directories) => {
        let dic = {};
        directories.forEach(dir => 
            dic[dir.name] = dic[dir.name] 
                ? dic[dir.name].concat(dir.documents) 
                : dir.documents);
                
        directories =  Object.keys(dic).map(dirName => new Directory(dirName, dic[dirName]))
        return directories;
    },

    initialize: async function (session) {
        let state = {
            ...LocalStorage.initialize(),
        }
        if (session) {
            const StoreState = await Store.initialize();
            const directories = [...state.legajoDirectories, ...StoreState.legajoDirectories];
            state = {
                legajoDirectories: this.setedDirectories(directories),
            }
        }

        return state;
    },
    deleteDoc: async function (name, type, dir, index) {
        const deleteModes = {
            selected: () => {
                dir.removeDoc(index);
            },
            cloud: () => {
                Store.deleteDoc(name);
            },
            local: () => {
                LocalStorage.deleteDoc(name);
            }
        }
        deleteModes[type]();
    },
}

export default StoreMan;
