import { toast } from "react-toastify";

const dummyData = [
  {
    name: "Collection 1",
    label: "Collection 1",
    id: "1",
    data: [
      {
        id: "1",
        name: "Mert",
        age: "25",
        city: "Istanbul",

        country: "Turkey",
        image: "https://picsum.photos/200/300",
      },
      {
        id: "2",
        name: "Oguz",
        age: "213",
        patates: "püre",
        city: "Adana",
        country: "Turkey",
        image: "https://picsum.photos/200/300",
      },
    ],
  },
  {
    name: "Collection 2",
    label: "Collection 2",
    id: "2",
    data: [
      {
        id: "1",
        name: "Ömer",
        age: "27",
        city: "Istanbul",
        country: "Turkey",
        image: "https://picsum.photos/200/300",
      },
      {
        id: "1",
        name: "Ömer",
        age: "27",
        city: "Istanbul",
        country: "Turkey",
        image: "https://picsum.photos/200/300",
        asdasdas: "asfasmfamkfaskmfas",
      },
    ],
  },
];

export const fetchCollectionsData = (collectionsDataId = "") => async (dispatch, getState) => {
  // - Axios İsteği attım
  // dönen datayı şlimdilik dummy  Data diye kabul ediyorum
  const sonData = getState().collectionsDataReducer
  if (collectionsDataId) {
    if (dummyData.length > 0) {
      const wantedData = dummyData.find((item) => item.id === collectionsDataId)
      if (wantedData?.id) {
        toast.success(`Collection ${wantedData?.id} Fetched!`);
        dispatch({ type: 'GET_COLLECTIONSDATA', payload: wantedData })
      } else {
        toast.warn(`There is no Collection!`);
        dispatch({ type: 'GET_COLLECTIONSDATA', payload: [] })
      }
    } else {
      toast.warn(`There is no Collection!`);
      dispatch({ type: 'GET_COLLECTIONSDATA', payload: [] })
    }
  }};
export const addCollectionsData = (collectionsDataId = "", collectionData = []) => async (dispatch, getState) => {

  if (collectionData.length > 0) {
    if (!Array.isArray(collectionData)) {
      const dataToArray = [collectionData]
      toast.success('Collection Turned Into Array and Added!');
      dispatch({ type: 'ADD_COLLECTIONSDATA', payload: dataToArray })
    } else {
      toast.success('CollectionData Added!');
      dispatch({ type: 'ADD_COLLECTIONSDATA', payload: collectionData })
    }


    // - [{objeyi array ayapar}]
    // - bana gelen data da tek bir obje olabilir o zaman gelen veriyi kontrol edip onu array şekline çevirmem lazıms
    // - eğer seçili bir collection varsa işleme devam et.
    // - bu collection'ın mevcut datası var mı kontrol et
    // - yoksa datayı ekle varsa mevcut data ile birleştir

  } else {
    toast.warn("CollectionData Couldn't Added!");

  }
}
 //--- RemoveItem from Coolection DATA (COLLECTION ID ve DATA)
//--- BULK REMOVE COLLECTION DATA (COOLECTION ID ve ARRAY OF DATA)
