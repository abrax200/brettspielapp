import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './main.css'
import SearchPage from "./pages/search/search.js"
import CollectionPage from "./pages/collections/collections.js"
import SettingsPage from "./pages/settings/settings.js"

function PagesContainer(){
	//Alle drei Komponenten der Seiten in einer Liste
	var pages = [
		<CollectionPage></CollectionPage>,
		<SearchPage></SearchPage>,
		<SettingsPage></SettingsPage>
	]

	//Variable page specihert die aktuelle Seite
	var [page, setPage] = useState(pages[1])
	console.log(page)

	return(
		<>
		<div className="pagecontainer">
			{page}
		</div>
		<nav className="tabs">
		{/* Collections */}
		<button className="tabs_icon" onClick={() => {setPage(pages[0])}}>
			{/* Hier muss ein Div hin, weil sich ein svg selbst nur schlecht layouten lässt */}
			<div>
			<svg>
				<g transform="scale(0.25)">
				<path
					d="m 75,70 h 20 c 2.77,0 5,2.23 5,5 v 20 c 0,2.77 -2.23,5 -5,5 H 75 c -2.77,0 -5,-2.23 -5,-5 V 75 c 0,-2.77 2.23,-5 5,-5 z m -35,0 h 20 c 2.77,0 5,2.23 5,5 v 20 c 0,2.77 -2.23,5 -5,5 H 40 c -2.77,0 -5,-2.23 -5,-5 V 75 c 0,-2.77 2.23,-5 5,-5 z M 5,70 h 20 c 2.77,0 5,2.23 5,5 v 20 c 0,2.77 -2.23,5 -5,5 H 5 C 2.23,100 0,97.77 0,95 V 75 C 0,72.23 2.23,70 5,70 Z M 75,35 h 20 c 2.77,0 5,2.23 5,5 v 20 c 0,2.77 -2.23,5 -5,5 H 75 c -2.77,0 -5,-2.23 -5,-5 V 40 c 0,-2.77 2.23,-5 5,-5 z m -35,0 h 20 c 2.77,0 5,2.23 5,5 v 20 c 0,2.77 -2.23,5 -5,5 H 40 c -2.77,0 -5,-2.23 -5,-5 V 40 c 0,-2.77 2.23,-5 5,-5 z M 5,35 h 20 c 2.77,0 5,2.23 5,5 v 20 c 0,2.77 -2.23,5 -5,5 H 5 C 2.23,65 0,62.77 0,60 V 40 C 0,37.23 2.23,35 5,35 Z M 75,0 h 20 c 2.77,0 5,2.23 5,5 v 20 c 0,2.77 -2.23,5 -5,5 H 75 c -2.77,0 -5,-2.23 -5,-5 V 5 C 70,2.23 72.23,0 75,0 Z M 40,0 h 20 c 2.77,0 5,2.23 5,5 v 20 c 0,2.77 -2.23,5 -5,5 H 40 c -2.77,0 -5,-2.23 -5,-5 V 5 C 35,2.23 37.23,0 40,0 Z M 5,0 h 20 c 2.77,0 5,2.23 5,5 v 20 c 0,2.77 -2.23,5 -5,5 H 5 C 2.23,30 0,27.77 0,25 V 5 C 0,2.23 2.23,0 5,0 Z"/>
					</g>
			</svg>
			</div>
		</button>
		<button className="tabs_icon" onClick={() => {setPage(pages[1])}}>
			<div>
			<svg>
				<g transform="scale(0.25)">
					<path
						d="M 31.872472,0 A 31.872533,31.872531 0 0 0 0,31.872473 31.872533,31.872531 0 0 0 31.872472,63.744945 31.872533,31.872531 0 0 0 52.617459,56.066346 c -0.1509,1.179684 0.227613,2.413007 1.137399,3.322793 l 39.440487,39.440486 c 1.560706,1.560705 4.073573,1.560705 5.634281,0 1.560704,-1.56071 1.560704,-4.07357 0,-5.63428 L 59.389139,53.754858 C 58.479353,52.845073 57.24603,52.46656 56.066345,52.617459 A 31.872533,31.872531 0 0 0 63.744945,31.872473 31.872533,31.872531 0 0 0 31.872472,0 Z m 0,7.9679888 A 23.9044,23.9044 0 0 1 55.776439,31.872473 23.9044,23.9044 0 0 1 31.872472,55.776439 23.9044,23.9044 0 0 1 7.967989,31.872473 23.9044,23.9044 0 0 1 31.872472,7.9679888 Z" />
				</g>
			</svg>
			</div>
		</button>
		{/* Settings */}
		<button className="tabs_icon" onClick={() => {setPage(pages[2])}}>
			<div>
			<svg>
				<g transform="scale(0.25)">
					<path
						d="M 50.000048,8.3334351 A 41.666667,41.666665 0 0 0 8.3333414,50.000142 41.666667,41.666665 0 0 0 50.000048,91.666849 41.666667,41.666665 0 0 0 91.666755,50.000142 41.666667,41.666665 0 0 0 50.000048,8.3334351 Z m 0.294039,18.9016879 c 3.414834,0.02296 6.802832,0.834388 9.846426,2.392103 7.083925,3.415948 12.043553,10.78313 12.571328,18.622118 0.547695,6.216443 -1.700803,12.553746 -5.895766,17.146756 -4.045558,4.375269 -9.868035,7.277643 -15.877582,7.322553 -6.314469,0.427821 -12.649666,-2.178942 -17.088363,-6.634739 -4.09312,-4.131231 -6.713281,-9.8942 -6.581511,-15.758726 -0.23464,-3.913397 0.875795,-7.796432 2.740401,-11.211203 3.777335,-7.100123 11.554481,-11.82578 19.601905,-11.87266 0.227798,-0.0055 0.455506,-0.0077 0.683162,-0.0062 z M 41.03429,0 V 28.433482 L 20.948099,8.3529366 8.3213942,20.97648 28.43878,41.08821 H 0 V 58.940279 H 28.430692 L 8.3213942,79.043924 20.948099,91.667083 41.071262,71.549574 V 100 H 58.928349 V 71.56921 L 79.031871,91.667083 91.658573,79.043924 71.549278,58.940279 H 100 V 41.08821 H 71.488814 L 91.652415,20.930277 79.025708,8.3071198 58.891378,28.435791 V 0 Z m 8.965708,30.10946 A 19.91092,19.905324 0 0 1 69.910956,50.014821 19.91092,19.905324 0 0 1 49.999998,69.920183 19.91092,19.905324 0 0 1 30.08904,50.014821 19.91092,19.905324 0 0 1 49.999998,30.10946 Z"/>
					</g>
				</svg>
				</div>
			</button>
	</nav>
	</>
	)
}
ReactDOM.render(
	<React.StrictMode>
		<PagesContainer/>
	</React.StrictMode>,
document.getElementById('root')
);