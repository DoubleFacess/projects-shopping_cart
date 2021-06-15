const DB_NAME = 'catdb'
const DB_VERSION = 1
let DB

export default {
	async getDb() {
		return new Promise((resolve, reject) => {
			if(DB) { 
				return resolve(DB); 
			}
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
				objectStore.createIndex('id', 'id', { unique: false})
				objectStore.createIndex('uid', 'uid', { unique: false})
			}
		})
	},
	async deleteItem(cat) {
		let db = await this.getDb()
		return new Promise(resolve => {
			let empty = []
			let trans = db.transaction(['cats'],'readwrite')
			trans.oncomplete = () => {
				resolve(empty)
			}
			let store = trans.objectStore('cats')
			store.openCursor().onsuccess = e => {
				let cursor = e.target.result
				if (cursor) {
					store.delete(cursor.value)
					cursor.continue()
				}
			}
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
	},
	async removeAll () {
		let db = await this.getDb()
		return new Promise(resolve => {
			let trans = db.transaction(['cats'],'readwrite')
			trans.oncomplete = () => {
				resolve()
			}
			let store = trans.objectStore('cats')
			store.clear()
		})
	},
	async update (item) {
		console.log(item)
		let db = await this.getDb()
		return new Promise(resolve => {
			let trans = db.transaction(['cats'],'readwrite')
			trans.oncomplete = () => {
				resolve('success')
				//resolve()
			}
			let store = trans.objectStore('cats')
			store.openCursor().onsuccess = e => {
				let cursor = e.target.result
				if(cursor) {
					//console.log('controllo: cursor exists')
					//console.log('controllo: cursor id value')
					//console.log(cursor.value._id)
					//console.log('controllo: item id')
					//console.log(item._id)
					if (cursor.value._id === item._id) {
						//console.log('cursor id = item id')
						let updateData = {}
						updateData._id = item._id
						updateData.name = item.name
						updateData.price = item.price
						updateData.uid = item.uid
						updateData.qty = item.qty
						//console.log(updateData)
						const request = cursor.update(item)
						request.onsuccess = function() {
							console.log('data updated')
						}					
					}
					cursor.continue()
				}
					
			}
		})		
	},
	async deleteData(x) {
		let db = await this.getDb()
		return new Promise(resolve => {
			let transaction = db.transaction(['cats'],'readwrite')
			transaction.oncomplete = () => {
				resolve('Transaction completed')
				//resolve()
			}
			transaction.onerror = function(event) {
				console.log(transaction.error)
			}
			let store = transaction.objectStore('cats')	  
			// create an object store on the transaction
			var objectStore = transaction.objectStore("cats")		
			// Make a request to delete the specified record out of the object store
			var objectStoreRequest = objectStore.delete(x)
		
			objectStoreRequest.onsuccess = function(event) {
				console.log('report the success of our request')
			}
			objectStoreRequest.onerror = function(event) {
				console.log(transaction.error)
			}
		})
	}

}