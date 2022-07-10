// ** React Imports
import React, {useEffect} from "react";

// ** REDUX
import { connect } from 'react-redux'
import { fetchRecommeditionUsers } from '../../../../redux/actions/recommeditionUsers'

// ** Table Data & Columns
import Table from "./Table";

const Users = ({ userListData = [], fetchRecommeditionUsers = () => { } }) => {
  // ** States

  useEffect(() => {
    fetchRecommeditionUsers()
}, []);

// TABLE COMPONENT'İNE PROP OLARAK GÖNDERİYORUZ VE SİLDİĞİMİZİN ROW'UN REDUX TARAFINA GÖNDERİLMESİNİ SAĞLIYOR
  const handleRemoveTableItem = (item) => {
  }
  
return (
  <>
    <Table
      list={userListData}
      tableRemoveItem={handleRemoveTableItem}
      useImport = {true}
    />
  </>
);
};
const mapStateToProps = (state) => {
  return { userListData: state.recommeditionUsersReducer } // PROP!!!!! collectionList !!!
}

export default connect(mapStateToProps, { fetchRecommeditionUsers })(
  // FUNCTIONLARDA PROP OLUYOR
  Users
)
