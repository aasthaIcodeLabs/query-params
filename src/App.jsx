import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Filter from "./components/Filter";
import List from "./components/List";
import Pagination from "./components/Pagination";
// import data from './components/db.json'

function App() {
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchState, setSearchState] = useState({
    query: searchParams.get("query") || "",
    gender: searchParams.get("gender") || "",
    selectedLocations:
      (searchParams.get("location") &&
        searchParams.get("location").split(",")) ||
      [],
  });

  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const userPerPage = 5;

  useEffect(() => {
    fetch("https://dummyjson.com/users?limit=0")
      .then((res) => res.json())
      .then((result) => {
        setData(result.users);
      });
  }, []);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSearchParams((prevParams) => {
      prevParams.set("page", pageNumber);
      return prevParams;
    });
  };

  const handleSelectedGender = (gender) => {
    setSearchState({
      ...searchState,
      gender,
    });
    setSearchParams((prevParams) => {
      prevParams.set("gender", gender);
      return prevParams;
    });
  };

  const handleTextChange = (e) => {
    const query = e.target.value;
    setSearchState({
      ...searchState,
      query,
    });
    setSearchParams((prevParams) => {
      prevParams.set("query", query);
      return prevParams;
    });
  };

  const handleLocationChange = (locationName) => {
    const prevLocations = [...searchState.selectedLocations];
    const newLocations = prevLocations.includes(locationName)
      ? prevLocations.filter((location) => location !== locationName)
      : [...prevLocations, locationName];

    setSearchState({
      ...searchState,
      selectedLocations: newLocations,
    });

    console.log(newLocations, "newLocations");
    const newLocationSearchParams = newLocations.join(",");

    setSearchParams((prevParams) => {
      prevParams.set("location", newLocationSearchParams);
      return prevParams;
    });
  };

  const filteredUser = () => {
    const { query, gender, selectedLocations } = searchState;

    const allResults = data;
    let filtered =
      query && query.trim()
        ? allResults.filter((user) =>
            user.firstName.toLowerCase().includes(query.toLowerCase())
          )
        : allResults;
    filtered =
      gender && gender.trim()
        ? filtered.filter((user) => user.gender === gender)
        : filtered;
    filtered =
      Array.isArray(selectedLocations) && selectedLocations.length
        ? filtered.filter(
            (user) =>
              user.address && selectedLocations.includes(user.address.city)
          )
        : filtered;

    // filtering
    const indexOfLastUser = currentPage * userPerPage;
    const indexOfFirstUser = indexOfLastUser - userPerPage;

    return filtered.slice(indexOfFirstUser, indexOfLastUser);
  };

  const handleReset = () => {
    setSearchState({
      query: "",
      gender: "",
      selectedLocations: [],
    });
    setSearchParams({});
  };

  useEffect(() => {
    setSearchState({
      query: searchParams.get("query") || "",
      gender: searchParams.get("gender") || "",
      selectedLocations:
        (searchParams.get("location") &&
          searchParams.get("location").split(",")) ||
        [],
    });
  }, [searchParams]);

  return (
    <div className="flex flex-col justify-start items-start w-full min-h-[100vh] bg-black text-white">
      <div className="w-full text-center font-bold text-4xl py-8">
        <h1>React Filter App</h1>
      </div>

      <div className="flex bg-green-900 w-full px-10 py-2 min-h-[80vh] gap-10">
        <div>
          <Filter
            selectedGender={searchState.gender}
            handleSelectedGender={handleSelectedGender}
            userName={searchState.query}
            handleTextChange={handleTextChange}
            handleLocationChange={handleLocationChange}
            selectedLocation={searchState.selectedLocations}
            handleReset={handleReset}
            users={data}
          />
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <List users={filteredUser()} />

          <Pagination
            currentPage={currentPage}
            totalUsers={data.length}
            handlePagination={handlePagination}
            userPerPage={userPerPage}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
