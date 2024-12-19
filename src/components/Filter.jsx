import React from "react";
import data from "./db.json";

const Filter = ({
  selectedGender,
  handleSelectedGender,
  handleTextChange,
  userName,
  handleLocationChange,
  selectedLocation,
  handleReset,
  users
}) => {


const uniqueGenders = [...new Set(users.map((user) => user.gender))];

  const genderOptions = uniqueGenders.map((gender) => (
    <div key={gender}>
      <input
        type="radio"
        name="gender"
        id={gender}
        value={selectedGender}
        checked={selectedGender === gender}
        onChange={() => handleSelectedGender(gender)}
      />
      <label htmlFor={gender}>{gender}</label>
    </div>
  ));



const uniqueLocations = [...new Set(users.map((user) => user.address.city))];

  const LocationOptions = uniqueLocations.map((location) => (
    <div key={location}>
      <input
        type="checkbox"
        name="location"
        id={location}
        value={selectedLocation}
        checked={selectedLocation.includes(location)}
        onChange={() => handleLocationChange(location)}
      />
      <label htmlFor={location}>{location}</label>
    </div>
  ));
  return (
    <div className="w-full flex flex-col p-3 gap-4">
      <h2 className="font-bold text-yellow-500 text-4xl">All Filters</h2>

      <div className="flex flex-col gap-1">
        <h2 className="font-bold text-yellow-500"> Enter Name: </h2>
        <input
          type="text"
          className="bg-slate-200 focus:outline-none px-2 py-2 text-green-600 text-xl font-semibold rounded-md"
          placeholder="Search..."
          value={userName}
          onChange={(e) => handleTextChange(e)}
        />
      </div>
      <div>
        <h2 className="font-bold text-yellow-500">Select Gender :</h2>
        {genderOptions}
      </div>
      <div>
        <h2 className="font-bold text-yellow-500">Select Location :</h2>
        {LocationOptions}
      </div>

      <div>
        <button
          onClick={handleReset}
          className="bg-yellow-600 px-4 py-2  rounded-md"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Filter;
