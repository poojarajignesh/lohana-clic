
const [districts, setDistricts] = useState([]);
const [talukas, setTalukas] = useState([]);

const handleStateChange = (e) => {
  const state = e.target.value;
  setFormData({ ...formData, state, district: "", taluka: "" });
  setDistricts(getDistricts(state));
  setTalukas([]);
};

const handleDistrictChange = (e) => {
  const district = e.target.value;
  setFormData({ ...formData, district, taluka: "" });
  setTalukas(getTalukas(formData.state, district));
};


<SelectField 
  label="State" name="state" value={formData.state} 
  onChange={handleStateChange} options={getStates()} 
/>
<SelectField 
  label="District" name="district" value={formData.district} 
  onChange={handleDistrictChange} options={districts} 
/>
<SelectField 
  label="Taluka" name="taluka" value={formData.taluka} 
  onChange={handleChange} options={talukas} 
/>