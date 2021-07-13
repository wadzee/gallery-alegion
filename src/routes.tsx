import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'

import GalleryPage from 'pages/GalleryPage'
import GalleryDetailPage from 'pages/GalleryDetailPage'

export default function Routes() {
  return (
    <Router>
      <Switch>
        <div
          style={{
            margin: '0 auto',
            maxWidth: '1300px',
            padding: '20px 0'
          }}>
          <Route path="/" exact component={GalleryPage} />
          <Route path="/image" exact component={GalleryDetailPage} />
          <Redirect to="/" />
        </div>
      </Switch>
    </Router>
  )
}
