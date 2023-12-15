import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import useQuery from '../hooks/useQuery';
import { searchPeople } from '../actions/people';
import { ProfileProps } from '../interfaces/sidebar';
import { REMOVE_PEOPLE } from '../constants';

const Searchbar = ({ activeTab }: ProfileProps) => {
    const location = useLocation();
    const dispatch: any = useDispatch();
    const navigate: any = useNavigate();
    const { name } = useQuery();
    const value = name || '';
    const type = 'name';
    const [searchType, setSearchType] = useState(type);
    const [searchValue, setSearchValue] = useState(value);

    const handleSearch = () => {
        document.title = "Search People | Quill";
        dispatch(searchPeople(searchType, searchValue));
    };

    const handleKeyDown = (e: any) => {
        if(e.key === "Enter") {
            navigate(`/people/search?${searchType}=${searchValue || 'empty'}`);
        }
    };

    const handleChange = (e: any) => {
        setSearchValue(e.target.value);
    };
    
    useEffect(() => {
        if(location.pathname.includes('/search')) return handleSearch();
        document.title = "Home | Quill";
        setSearchValue('');

        return () => {
            dispatch({ type: REMOVE_PEOPLE });
        };
    }, [location]);

    return (
        <div className='mt-[10px] pb-3 border-b border-solid border-grey relative'>
            <input onKeyDown={handleKeyDown} onChange={handleChange} value={searchValue} className='h-40px w-full border border-solid border-lightgrey bg-lightgrey transition-border duration-200 rounded-[20px] px-3 outline-none hover:border-grey focus:border-grey' type="text" placeholder={`Search ${activeTab}`} />
            <div className='absolute top-0 right-0 h-40px w-40px text-center leading-10'>
                <i className="fa-solid fa-magnifying-glass text-darkgrey"></i>
            </div>
        </div>
    )
};

export default Searchbar;