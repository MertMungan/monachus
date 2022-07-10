import React, {useEffect} from "react";
import Table from "./Table";

import { connect } from 'react-redux'
import { fetchRecommeditionItems, fetchRemovedItem } from '../../../../redux/actions/recommeditionItems'


const Items = ({ itemListData = [], fetchRecommeditionItems = () => { }, fetchRemovedItem = () => { } }) => {  

  useEffect(() => {
    fetchRecommeditionItems()
  }, []);

  const handleRemoveTableItem = (item) => {
    fetchRemovedItem(item)
  }

  return (
    <Table
      list={itemListData}
      tableRemoveItem={handleRemoveTableItem}
    />
  );
}

const mapStateToProps = (state) => {
  return { itemListData: state.recommeditionItemsReducer } // PROP!!!!! collectionList !!!
}

export default connect(mapStateToProps, { fetchRecommeditionItems, fetchRemovedItem })(
  // FUNCTIONLARDA PROP OLUYOR
  Items
)
