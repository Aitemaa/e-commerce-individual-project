import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserDetail, fetchUser } from "../../features/userSlice";
import { fetchCities } from "../../features/citySlice";
import { useNavigate } from "react-router-dom";

export function UserDetail() {
  const user = useSelector((state) => state.user.data);
  const cities = useSelector((state) => state.cities.list);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [newUser, setNewUser] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    province: "",
    postalCode: "",
    CityId: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addUserDetail(newUser));
      nav("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(fetchUser()).then((res) =>
      setNewUser({
        fullName: res.user.fullName,
        phoneNumber: res.user.phoneNumber,
        address: res.user.address,
        province: res.user.province,
        postalCode: res.user.postalCode,
        CityId: res.user.CityId,
      })
    );

    dispatch(fetchCities());
  }, [dispatch]);
  return (
    <div className="container mx-auto mt-10 p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">User Information</h2>
        {user && cities.cities && (
          <form onSubmit={handleSubmit} type="submit">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  defaultValue={newUser.fullName}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  defaultValue={newUser.phoneNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="form-group">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  defaultValue={newUser.address}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="form-group">
                <label
                  htmlFor="CityId"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <select name="CityId" onChange={handleChange} id="CityId">
                  <option value={newUser.CityId}>
                    
                  </option>
                  {Array.isArray(cities.cities) &&
                    cities.cities.map((city) => (
                      <option id="cities" key={city.id} value={city.id}>
                        {city.cityName}
                      </option>
                    ))}
                </select>
              </div>

              <div className="form-group">
                <label
                  htmlFor="province"
                  className="block text-sm font-medium text-gray-700"
                >
                  Province
                </label>
                <input
                  type="text"
                  id="province"
                  name="province"
                  defaultValue={newUser.province}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="form-group">
                <label
                  htmlFor="postalCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  defaultValue={newUser.postalCode}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="w-full inline-flex justify-center py-2 px-4 shadow-sm text-sm font-medium rounded-md btn-primary btn__user"
              >
                Submit
              </button>
            </div>
          </form>
        )}{" "}
      </div>
    </div>
  );
}
