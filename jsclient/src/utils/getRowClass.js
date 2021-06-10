const getRowClass = function (item) {
    let newlyCreated = Date.now() - Date.parse(item.created_at) < 5000;
    let newlyUpdated = Date.now() - Date.parse(item.updated_at) < 5000;
    return newlyCreated || newlyUpdated ? "new" : "old";
  }

export default getRowClass