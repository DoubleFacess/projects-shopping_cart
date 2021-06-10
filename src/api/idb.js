const DB_NAME = 'catdb'
const DB_VERSION = 1
let DB

export default {
	async getDb() {
		return new Promise((resolve, reject) => {
			if(DB) { return resolve(DB); }
			console.log('OPENING DB', DB)
			let request = window.indexedDB.open(DB_NAME, DB_VERSION)			
			request.onerror = e => {
				console.log('Error opening db', e)
				reject('Error')
			}	
			request.onsuccess = e => {
				DB = e.target.result
				resolve(DB)
			}			
			request.onupgradeneeded = e => {
				console.log('onupgradeneeded')
				let db = e.target.result
				let objectStore = db.createObjectStore("cats", { autoIncrement: true, keyPath: '_id' })
				//db.createObjectStore("cats", { autoIncrement: true, keyPath: '_id' })
				objectStore.createIndex('name', 'name', { unique: false})
				objectStore.createIndex('uid', 'uid', { unique: false})
			}
		})
	},
	async deleteItem(cat) {
		let db = await this.getDb()
		return new Promise(resolve => {
			let trans = db.transaction(['cats'],'readwrite')
			trans.oncomplete = () => {
				resolve()
			}
			let store = trans.objectStore('cats')
			store.delete(cat.id)
		})
	},
	async getItems() {
		let db = await this.getDb()
		return new Promise(resolve => {
			let trans = db.transaction(['cats'],'readonly')
			trans.oncomplete = () => {
				resolve(cats)
			}			
			let store = trans.objectStore('cats')
			let cats = []			
			store.openCursor().onsuccess = e => {
				let cursor = e.target.result
				if (cursor) {
					cats.push(cursor.value)
					cursor.continue()
				}
			}

		})
	},
	async saveItem(cat) {
		let db = await this.getDb()
		return new Promise(resolve => {
			let trans = db.transaction(['cats'],'readwrite');
			trans.oncomplete = () => {
				resolve()
			}
			let store = trans.objectStore('cats')
			store.put(cat)
		})	
	}

}