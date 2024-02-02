import { createSlice } from "@reduxjs/toolkit";

const siteSlice = createSlice({
  name: "site",
  initialState: {
    isLoading: false,
    data: {
      title: "Dharmsinh Desai University",
      client_name: "H.M. Desai",
      budget: "10 Cr.",
      location: "Nadiad, Gujarat",
      siteDetails: [
        {
          title: "Water Contractor",
          img_url:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2oe6bt_1pqM3qih3o7z6Z_SMHxzQ3qgYgdkfyYiivNLkNusSI_eE-7Le3ig&s",
        },
        {
          title: "Electricity",
          img_url:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2oe6bt_1pqM3qih3o7z6Z_SMHxzQ3qgYgdkfyYiivNLkNusSI_eE-7Le3ig&s",
        },
        {
          title: "Concrete",
          img_url:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2oe6bt_1pqM3qih3o7z6Z_SMHxzQ3qgYgdkfyYiivNLkNusSI_eE-7Le3ig&s",
        },
      ],
      status: "in_progress",
      city: "Nadiad",
      description: "this is the description of the Dharmsinh desai university project. which is location in nadiad, college road, which is in the gujarat state, near the ahmedabad city. it is small town and students don't get much opportunity to explore other things along with studies."
    },

    isError: false,
  },
});

export default siteSlice.reducer;
