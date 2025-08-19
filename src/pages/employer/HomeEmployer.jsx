import Header from "../../components/common/Header";
import TapBar from "../../components/common/TapBar";
import Search from "../../components/common/Search";
import "./HomeEmployer.css";

import {useState} from 'react';

const HomeEmployer = () => {
    const [search, setSearch] = useState("");
    const onChangeSearch = (e) => {
        setSearch(e.target.value);
        console.log(e.target.value)
    }
    return (
    <>
        <Header/>
        <Search text="검색어를 입력하세요."
                onChange={onChangeSearch} />
        HomeEmployer
        <TapBar/>
    </>
    )
}

export default HomeEmployer