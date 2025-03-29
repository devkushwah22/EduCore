import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import Upload from "../Upload"

// APIs
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI"


// Redux actions hain, jo course data aur form step manage karte hain.
import { setCourse, setStep } from "../../../../../slices/courseSlice"
//  Course ki status (jaise DRAFT, PUBLISHED) define karta hai.
import { COURSE_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../common/IconBtn"
// import Upload from "../Upload"
import ChipInput from "./ChipInput"
import RequirementsField from "./RequirementField"


// CourseInformationForm component, jo course information form ko render karta hai.
export default function CourseInformationForm() {

  // useForm ki ye saari functionality jaanne  ke liye contactUsForm me jaao
  const {
    register,  // Form fields ko register karne ke liye use hota hai.
    handleSubmit,  // Form submit karne ke liye use hota hai.
    setValue, getValues,  // Form values set aur get karne ke liye use hote hain.
    formState: { errors }, // Form validation errors handle karne ke liye use hota hai.
  } = useForm()


  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth) 
  // course:  Current course ka data hai (edit mode mein).
  // editCourse: Boolean hai, jo batata hai ki form edit mode mein hai ya nahi.
  const { course, editCourse } = useSelector((state) => state.course) 
  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])


  // Categories Fetch Karna aur Edit Mode Mein Data Populate Karna
  // Component load hone par categories fetch kiye jate hain.
  // Agar form edit mode mein hai, toh existing course data form fields mein populate kiya jata hai.
  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const categories = await fetchCourseCategories()  // API from service
      if (categories.length > 0) {
        // console.log("categories", categories)
        setCourseCategories(categories)   // state variable
      }
      setLoading(false)
    }
    // edit mode chalu hai iska matlab, ek bhi changes par sab current values set hoti jaayngi har field ki
    if (editCourse) {   // boolean hai bhai,  true ya false
      // console.log("data populated", editCourse)
      setValue("courseTitle", course.courseName)   // useForm functionality of set values
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category)
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)
    }
    getCategories()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  // Yeh function check karega ki user ne form me koi changes kiye hain ya nahi.
  // Agar changes hue hain to true return karega, warna false. aur true/false ke hisaab se API call hogi wrna faaltu network call ku kare 
  const isFormUpdated = () => {
    const currentValues = getValues()
    // console.log("changes after editing form values:", currentValues)
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    ) {
      return true
    }
    return false
  }

  //   handle next button click
  const onSubmit = async (data) => {
    // console.log(data)

    /**
     * Yeh function do cases handle karta hai:
       1. Agar editCourse true hai:
            Form me koi changes hue hain ya nahi isFormUpdated() function se check karega.
            Agar changes hain, to editCourseDetails() API call karega aur course update karega.
            Agar koi change nahi hai, to ek error toast show karega.
       2. Agar editCourse false hai (naya course bana rahe hain):
            Naya course create karne ke liye addCourseDetails() API call karega.
            setStep(2) aur setCourse(result) Redux store update karne ke liye dispatch karega.
     */
    if (editCourse) {
      // const currentValues = getValues()
      // console.log("changes after editing form values:", currentValues)
      // console.log("now course:", course)
      // console.log("Has Form Changed:", isFormUpdated())

      if (isFormUpdated()) {
        const currentValues = getValues()
        //FormData() =  built-in JavaScript object hai jo form data ko store karta hai json formate me.
        const formData = new FormData()  
        // console.log(data)

        // Agar edit mode hai, tab sirf wahi fields FormData me append ho rahi hain jo change hui hain.
        formData.append("courseId", course._id)  // Existing course ka ID bhejna zaroori hai
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle)   // Naya title
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc)   // Naya description
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice)    // Nayi price
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags))    // Naye tags
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits)
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory)
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          )
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage)   // Naya thumbnail image
        }
        console.log("Edit Form data: ", formData)

        // course edit hone par uska status update kar raha hai.
        // Agar koi change kiya gaya hai, to backend par update request bhej raha hai, aur agar koi change nahi kiya to ek error toast dikha raha hai.
        setLoading(true)
        const result = await editCourseDetails(formData, token)
        setLoading(false)
        if (result) {
          // Agar result mil jaye, to Redux state update ho rahi hai:
          dispatch(setStep(2))  // 🟢 Next step pe le ja raha hai (Step 2)
          dispatch(setCourse(result))  // 🟢 Redux me naya updated course set ho raha hai
        }
      } else {
        toast.error("No changes made to the form")
      }
      return  // Yeh return statement function ko yahi pe exit karwa dega, taaki aage ka code na chale.
    }


    // 2️⃣ Jab Naya Course Create Ho Raha Hai:
    // Naya course create karte waqt saare fields FormData me append ho rahe hain
    const formData = new FormData()
    formData.append("courseName", data.courseTitle)
    formData.append("courseDescription", data.courseShortDesc)
    formData.append("price", data.coursePrice)
    formData.append("tag", JSON.stringify(data.courseTags))  // Array hai, isiliye JSON stringify
    formData.append("whatYouWillLearn", data.courseBenefits)
    formData.append("category", data.courseCategory)
    formData.append("status", COURSE_STATUS.DRAFT)  // Default status DRAFT set kar diya
    formData.append("instructions", JSON.stringify(data.courseRequirements))  // Array
    formData.append("thumbnailImage", data.courseImage)  // Image file append ki

    // same as avove
    setLoading(true)
    console.log("Before addcourseDetails API")
    console.log("printing form data", formData)
    const result = await addCourseDetails(formData, token)
    if (result) {
      
      dispatch(setStep(2))  
      dispatch(setCourse(result))  
    }
    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
    >
      {/* Course Title */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseTitle">
          Course Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="form-style w-full"
        />
        {errors.courseTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course title is required
          </span>
        )}
      </div>
      {/* Course Short Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
          Course Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.courseShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Description is required
          </span>
        )}
      </div>
      {/* Course Price */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="coursePrice">
          Course Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="form-style w-full !pl-12"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Price is required
          </span>
        )}
      </div>
      {/* Course Category */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseCategory">
          Course Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("courseCategory", {required: true})}
          defaultValue=""
          id="courseCategory"
          className="form-style w-full"
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            courseCategories?.map((category, indx) => (
              <option key={indx} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Category is required
          </span>
        )}
      </div>
      {/* Course Tags */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      {/* Course Thumbnail Image */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />
      {/* Benefits of the course */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseBenefits"> 
          Benefits of the course <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter benefits of the course"
          {...register("courseBenefits", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Benefits of the course is required
          </span>
        )}
      </div>
      {/* Requirements/Instructions */}
      <RequirementsField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />
      {/* Next Button */}
      <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          >
            Continue Wihout Saving
          </button>
        )}
        <IconBtn
          disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  )
}