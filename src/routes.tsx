import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'

import GalleryList from 'pages/GalleryList/GalleryList'
import GalleryDetails from 'pages/GalleryDetails/GalleryDetails'

export default function Routes() {
  return (
    <Router>
      <div
        style={{
          margin: '0 auto',
          maxWidth: '1600px'
        }}>
        <Switch>
          <Route path="/" exact component={GalleryList} />
          <Route path="/image" exact component={GalleryDetails} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}
