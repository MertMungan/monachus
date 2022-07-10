import mock from '../mock'
import { paginateArray } from '../utils'

const data = [
  {
    responsive_id: '',
    id: 1,
    avatar: '10.jpg',
    itemId: "5590850470043",
    deleted: 'Australia',
    handle: 'shirt-soil',
    image: 'image',
    link: 'link',
    note: 'note',
    price: 'price',
    product_title: 'product_title',
    type: 'type',
    vendor: 'vendor'
  },
  {
    responsive_id: '',
    id: 2,
    avatar: '10.jpg',
    itemId: "5590734831771",
    deleted: 'Australia',
    handle: 'raw-rug-160x250-cm-heaven',
    image: 'image',
    link: 'link',
    note: 'note',
    price: 'price',
    product_title: 'product_title',
    type: 'type',
    vendor: 'vendor'
  },
  {
    responsive_id: '',
    id: 3,
    avatar: '10.jpg',
    itemId: "5591285596315",
    deleted: 'Australia',
    handle: 'aiayu-cloth-3pcs-green-stripe',
    image: 'image',
    link: 'link',
    note: 'note',
    price: 'price',
    product_title: 'product_title',
    type: 'type',
    vendor: 'vendor'
  },
  {
    responsive_id: '',
    id: 4,
    avatar: '10.jpg',
    itemId: "5590856958107",
    deleted: 'Australia',
    handle: 'raul-50x50-cm-stormy',
    image: 'image',
    link: 'link',
    note: 'note',
    price: 'price',
    product_title: 'product_title',
    type: 'type',
    vendor: 'vendor'
  },
  {
    responsive_id: '',
    id: 5,
    avatar: '10.jpg',
    itemId: "5591600791707",
    deleted: 'Australia',
    handle: 'hamish-130x160-cm-air',
    image: 'image',
    link: 'link',
    note: 'note',
    price: 'price',
    product_title: 'product_title',
    type: 'type',
    vendor: 'vendor'
  },
  {
    responsive_id: '',
    id: 6,
    avatar: '10.jpg',
    itemId: "5591940989083",
    deleted: 'Australia',
    handle: 'curtain-patchwork-mix-white',
    image: 'image',
    link: 'link',
    note: 'note',
    price: 'price',
    product_title: 'product_title',
    type: 'type',
    vendor: 'vendor'
  },
  {
    responsive_id: '',
    id: 7,
    avatar: '10.jpg',
    itemId: "5590850470043",
    deleted: 'Australia',
    handle: 'shirt-soil',
    image: 'image',
    link: 'link',
    note: 'note',
    price: 'price',
    product_title: 'product_title',
    type: 'type',
    vendor: 'vendor'
  },
  {
    responsive_id: '',
    id: 8,
    avatar: '10.jpg',
    itemId: "5590734831771",
    deleted: 'Australia',
    handle: 'raw-rug-160x250-cm-heaven',
    image: 'image',
    link: 'link',
    note: 'note',
    price: 'price',
    product_title: 'product_title',
    type: 'type',
    vendor: 'vendor'
  },
  {
    responsive_id: '',
    id: 9,
    avatar: '10.jpg',
    itemId: "5591285596315",
    deleted: 'Australia',
    handle: 'aiayu-cloth-3pcs-green-stripe',
    image: 'image',
    link: 'link',
    note: 'note',
    price: 'price',
    product_title: 'product_title',
    type: 'type',
    vendor: 'vendor'
  },
  {
    responsive_id: '',
    id: 10,
    avatar: '10.jpg',
    itemId: "5590850470043",
    deleted: 'Australia',
    handle: 'shirt-soil',
    image: 'image',
    link: 'link',
    note: 'note',
    price: 'price',
    product_title: 'product_title',
    type: 'type',
    vendor: 'vendor'
  },
  {
    responsive_id: '',
    id: 11,
    avatar: '10.jpg',
    itemId: "5590734831771",
    deleted: 'Australia',
    handle: 'raw-rug-160x250-cm-heaven',
    image: 'image',
    link: 'link',
    note: 'note',
    price: 'price',
    product_title: 'product_title',
    type: 'type',
    vendor: 'vendor'
  },
  {
    responsive_id: '',
    id: 12,
    avatar: '10.jpg',
    itemId: "5591285596315",
    deleted: 'Australia',
    handle: 'aiayu-cloth-3pcs-green-stripe',
    image: 'image',
    link: 'link',
    note: 'note',
    price: 'price',
    product_title: 'product_title',
    type: 'type',
    vendor: 'vendor'
  },
  
]

mock.onGet('/api/mata/initial-items').reply(config => {
  return [200, data]
})

mock.onGet('/api/mata/items').reply(config => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', perPage = 10, page = 1 } = config
  /* eslint-enable */

  const queryLowered = q.toLowerCase()
  const filteredData = data.filter(
    item =>
    {Object.keys(item).toString().some((key) => {
      return item[key]
        .toString()
        .toLowerCase()
        .startsWith(value.toLowerCase());
    });
})
  /* eslint-enable  */

  return [
    200,
    {
      allData: data,
      invoices: paginateArray(filteredData, perPage, page),
      total: filteredData.length
    }
  ]
})
