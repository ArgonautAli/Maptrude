# 🐙 Maptrude

Maptrude is a project for Snaptrude! 

## Technology used 

### Frontend: 
1. React.Js for building UI 
2. Redux-toolkit for state management 
3. Google-maps-api for map rendering 
    3.1. DrawingManagerF for annotating map 
4. BabylonJS for 3d rendering shapes
5. html2canvas for capturing map info
6. AntDesign for component library 

### Backend: 
1. ExpressJs for building server 
2. JWT for authorization 
3. MongoDB for database & modeling
4. Redis for caching
5. Google-maps-api for geocodes


## How to setup

### Frontend: 
1. Create a .env in the root of the project & add these 3 keys:

```
REACT_APP_API_BASE="base url"
REACT_APP_GOOGLE_MAP="maps api"
```
2. Go to Frontend folder with 
``` cd frontend ```
3. Install dependencies and start server 
``` npm i && npm start ```

### Backend 
1. Create a .env in the root of the project & add these 3 keys:

```
DB_STRING = mongo db string
JWT_SECRET_KEY = secret key
GOOGLE_MAPS_API_KEY = maps api
REDIS_PASSWORD = redis pass
```
2. Go to Backed folder with 
``` cd frontend ```
3. Install dependencies and start server 
``` npm i && nodemon ```

## API Optimisation: 

Several API optimisation processes are done to handle large datasets like: 

1. ### Caching:
Redis caching is implement on both get textures & most frequent viewed sections API to minimise DB queries when data has not updated using ``` redis-client ```

#### Strategies
- Reduced MongoDB Load: Caching reduces the number of read operations MongoDB must handle.
- Faster Response Times: Retrieving data from cache is significantly faster than running a full aggregation query.
- Cost Efficiency: Reduced database load can translate to lower infrastructure costs.

2. ### Indexing:
Data schema is created in such a way to optimise queries for geocodes so that most frequently captured regions are queried performantly 

#### Strategies
- Faster Query Execution: MongoDB can quickly locate documents without scanning the entire collection.
- Reduced CPU Usage: Less time spent on searching translates to lower CPU usage.

3. ### Memory use: 
For frequent query, ``` allowDiskUse ``` is set to true so that memory use was optimized by carefully structuring the aggregation pipeline to minimize the amount of data kept in memory at any one time.

#### Strategies
- Limit Operations: We used the $limit stage to reduce the amount of data processed by subsequent stages in the pipeline.
- Selective Fields: Only necessary fields were included in the operations to reduce the overall dataset size in memory.