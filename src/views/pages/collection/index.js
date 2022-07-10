import React, { useEffect, useState } from 'react';
// REDUX
import { connect } from 'react-redux';
import { toast } from "react-toastify";
import { addCollection } from '../../../redux/actions/collections';
import { addCollectionsData, fetchCollectionsData } from '../../../redux/actions/collectionsData';
import Table from '../recommedition/components/Table';
import CollectionTopBar from './components/CollectionTopBar';

// REDUX

const CollectionIndex = ({
  collectionList = [], //MAPSTATEPROPS ASAĞIDA YAZANI PROP OLARAK BURAYA EKLE
  collectionsData = [],
  addCollection = () => { },
  addCollectionsData = () => { },
  fetchCollectionsData = () => { }
}) => {
  const [dataList, setDataList] = useState([])
  const [collections, setCollections] = useState([])
  const [selectedCollection, setSelectedCollection] = useState({})
  const [dummyID, setDummyID] = useState(1)
  const [hasCollection, setHasCollection] = useState(false)
  const [collectionFile, setCollectionFile] = useState([])
  const handleAddCollection = (item) => {
    if (item) {
      const newCollectionItem = {
        name: item,
        id: dummyID.toString(),
        label: item.toLowerCase().trim() //validate the input!!!
      }
      addCollection(newCollectionItem)
      // setCollections([...collections, newCollectionItem])
    }
  }

  const handleSelectChange = (selectedItem) => {
    setSelectedCollection(selectedItem)
  }

  const getFile = (item) => {
    // Collection'ın kendisi ve datası
    // ID'sine bağlı olarak Akif abiye gönderilecek
    setCollectionFile(item)
  }

  useEffect(() => {
    if (collectionsData.data) {
      setDataList(collectionsData.data)
    } else {
      setDataList([])
    }
  }, [collectionsData])




  useEffect(() => {
    // AXIOS CALL ILE YENI DATALARI CEK
    fetchCollectionsData(selectedCollection?.id)
  }, [selectedCollection])

  useEffect(() => {
    if (collectionList.length > 0) {
      setDummyID(collectionList.length + 1)
      setHasCollection(true)
    }
    setCollections(collectionList)
  }, [collectionList])

  useEffect(() => {
    // KONTROL EDILECEK UPLOAD BITTIKTEN SONRAKI ISLEME
    if (collectionFile.length > 0) {
      const newCollection = [{ ...selectedCollection, data: collectionFile, }];
      addCollectionsData(selectedCollection.id, newCollection);

    }
  }, [collectionFile]);

  return (
    <>
      <CollectionTopBar
        collectionList={collections}
        handleAddCollection={handleAddCollection}
        handleSelectedCollection={handleSelectChange}
      />
      <br />
      {selectedCollection?.id &&
        <Table
          list={dataList}
          hasCollection={hasCollection}
          selectedCollection={selectedCollection}
          getFile={getFile}
          useExport={false} /> }

    </>
  )
}



const mapStateToProps = (state) => {
  return { collectionList: state.collectionsReducer, collectionsData: state.collectionsDataReducer } // PROP!!!!! collectionList !!!
}

export default connect(mapStateToProps, {addCollection, addCollectionsData, fetchCollectionsData })(
  // FUNCTIONLARDA PROP OLUYOR
  CollectionIndex
)
