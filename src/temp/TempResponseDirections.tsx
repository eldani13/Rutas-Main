import { DirectionsResponse } from '@/types/RouteResponseApi'

export const routeResponse: DirectionsResponse = {
  routes: [
    {
      weight_name: 'auto',
      weight: 1744.524,
      duration: 616.482,
      distance: 2911.066,
      legs: [
        {
          via_waypoints: [],
          admins: [
            {
              iso_3166_1_alpha3: 'MEX',
              iso_3166_1: 'MX',
            },
          ],
          weight: 1744.524,
          duration: 616.482,
          steps: [],
          distance: 2911.066,
          summary: 'RADIAL 3, Calle 20 de Noviembre',
        },
      ],
      geometry: {
        coordinates: [
          [-99.131866, 19.412454],
          [-99.131798, 19.412672],
          [-99.131061, 19.412659],
          [-99.131045, 19.412747],
          [-99.13076, 19.412711],
          [-99.130527, 19.414203],
          [-99.134655, 19.414574],
          [-99.133596, 19.421901],
          [-99.133818, 19.422433],
          [-99.134323, 19.423003],
          [-99.134276, 19.423709],
          [-99.134541, 19.424291],
          [-99.133441, 19.432018],
          [-99.132379, 19.431884],
          [-99.132316, 19.432443],
        ],
        type: 'LineString',
      },
    },
  ],
  waypoints: [
    {
      distance: 27.213,
      name: '',
      location: [-99.131866, 19.412454],
    },
    {
      distance: 20.583,
      name: 'Calle Plaza de la Constitución',
      location: [-99.132316, 19.432443],
    },
  ],
  code: 'Ok',
  uuid: 'WRRiEJ_NAHU8Gstg6wQY0rtrocDuG_sjXSvZL-x76ueb9w46hPOkcA==',
}
