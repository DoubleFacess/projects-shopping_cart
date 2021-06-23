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
				let newObjectStore = db.createObjectStore("orders_details", { autoIncrement: true, keyPath: 'id' })
				let anotherObjectStore = db.createObjectStore("orders", { autoIncrement: false, keyPath: 'uid' })
				//db.createObjectStore("cats", { autoIncrement: true, keyPath: '_id' })
				objectStore.createIndex('id', 'id', { unique: false})
				objectStore.createIndex('uid', 'uid', { unique: false})
				newObjectStore.createIndex('id_order', 'id_order', { unique: true })
			}
		})
	},

	/* new functions */

	async clearTable(table) { //old functions removeAll deleteOrders
		let db = await this.getDb()
		return new Promise(resolve => {
			let trans = db.transaction([table], 'readwrite')
			trans.oncomplete = () => {
				resolve()
			}
			let store = trans.objectStore(table)
			store.clear()
			console.log('table successfully cleared')
		})
	},

	async myDeleteItem(table, id) {
		let db = await this.getDb()
		return new Promise(resolve => {
			let transaction = db.transaction([table], 'readwrite')
			transaction.oncomplete = () => {
				resolve('Transaction delete completed')
				//resolve()
			}
			transaction.onerror = function(event) {
				console.log(transaction.error)
			} 
			// create an object store on the transaction
			var objectStore = transaction.objectStore(table)
			var objectStoreRequest = objectStore.delete(id)
			objectStoreRequest.onsuccess = function(event) {
				console.log('report the success of our request')
			}
			objectStoreRequest.onerror = function(event) {
				console.log(transaction.error)
			}
		})
	},

	/* delete */
	
	
	async deleteOrder(order) {
		let db = await this.getDb()
		return new Promise(resolve => {
			let empty = []
			let trans = db.transaction(['orders'],'readwrite')
			trans.oncomplete = () => {
				resolve(empty)
			}
			let store = trans.objectStore('orders')			
			store.delete(order.uid)
			console.log('end of delete')
		})
	},
	async deleteData(x) {
		let db = await this.getDb()
		console.log('into idb fx')
		console.log(x)
		return new Promise(resolve => {
			let transaction = db.transaction(['cats'],'readwrite')
			transaction.oncomplete = () => {
				resolve('Transaction completed')
				//resolve()
			}
			transaction.onerror = function(event) {
				console.log(transaction.error)
			} 
			// create an object store on the transaction
			var objectStore = transaction.objectStore("cats")
			var objectStoreRequest = objectStore.delete(x)
			objectStoreRequest.onsuccess = function(event) {
				console.log('report the success of our request')
			}
			objectStoreRequest.onerror = function(event) {
				console.log(transaction.error)
			}
		})
	},
	/* get records */

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
	async getOrders() {
		let db = await this.getDb()
		return new Promise(resolve => {
			let trans = db.transaction(['orders'], 'readonly')
			trans.oncomplete = () => {
				resolve(orders)
			}			
			let store = trans.objectStore('orders')
			let orders = []			
			store.openCursor().onsuccess = e => {
				let cursor = e.target.result
				if (cursor) {
					cursor.continue()
					orders.push(cursor.value)
				}
			}

		})
	},

	async getOrderDetail(order) {
		let db = await this.getDb()
		return new Promise(resolve => {
			let trans = db.transaction(['orders_details'],'readonly')
			trans.oncomplete = () => {
				resolve(details)
			}
			var keyRangeValue = IDBKeyRange.only(order.uid)
			let store = trans.objectStore('orders_details')
			let myIndex = store.index('id_order')
  			var getKeyRequest = myIndex.getKey(order.uid)
			let getRequest = myIndex.get(order.uid)
			getRequest.onsuccess = function() {
				console.log(getKeyRequest.result)
				console.log('uhm')
			}
			let details = []
			myIndex.openCursor(keyRangeValue).onsuccess = function(event) {
				var cursor = event.target.result
				if(cursor) {
					details.push(cursor.value)
					cursor.continue()
				} else {
				  //console.log('Entries all displayed.')
				}
			}
		})
	},

	/* add records */
	
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
	async saveOrderDetails(order) {
		let db = await this.getDb()
		return new Promise(resolve => {
			let trans = db.transaction(['orders_details'], 'readwrite')
			trans.oncomplete = () => {
				resolve()
			}
			let store = trans.objectStore('orders_details')
			store.put(order)
		})	
	},
	async saveOrder(order) {
		let db = await this.getDb()
		return new Promise(resolve => {
			let trans = db.transaction(['orders'], 'readwrite')
			trans.oncomplete = () => {
				resolve()
			}
			let store = trans.objectStore('orders')
			store.put(order)
		})
	},

	/* update records */
	
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
	}
}