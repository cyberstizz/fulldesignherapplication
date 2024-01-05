import React from 'react';
import './Crocs.scss';



const  Crocs = () => {
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadedImagesCount, setLoadedImagesCount] = useState(0);
    const [allCrocs, setAllCrocs] = useState([]);


    const apiUrl = process.env.NODE_ENV === 'production'
    ? 'https://designhercustomekreations-c288e9799350.herokuapp.com/'
    : 'http://localhost:4000';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get(`${apiUrl}/allCrocs`);
                setAllCrocs(response.data);
            } catch (error) {
                console.error("Error fetching crocs data: ", error);
            }
        };
  
        fetchData();
    }, []);



    const handleImageLoaded = () => {
        setLoadedImagesCount(prevCount => prevCount + 1);
};

useEffect(() => {
  if (loadedImagesCount === AllCrocs.length) {
    setImagesLoaded(true);
  }
}, [loadedImagesCount]);

    return(
        <React.Fragment>
            {/* {!imagesLoaded && <Loader />} */}

    
            <main className='submenuBody'>
                  {AllCrocs.map(croc => (
                    <Link key={croc._id} to={`/products/${dress.category}/${dress._id}`}>
                        <SubMenuComponent onImageLoad={handleImageLoaded} name={dress.title} path={dress.imagePath} />
                    </Link>
                ))}
           
            
            </main>
           
        </React.Fragment>
    );
}

export default Crocs;
