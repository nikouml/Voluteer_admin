export default [
  {
    name: 'HomePage',
    path: '/home',
    children: [
      {
        name: 'HomePage-1',
        path: '1',
        children: [
          {
            name: 'HomePage-2',
            path: '2'
          }
        ]
      }
    ]
  }
]

const HomePage = 'HomePage'
const HomePage2 = 'HomePage-2'

export {HomePage, HomePage2}
