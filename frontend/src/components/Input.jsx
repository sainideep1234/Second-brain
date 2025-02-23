export default function Input({placeholder}){
    return <>
    
        <textarea  className="border border-gray-300 rounded-md w-full h-20 px-1 flex flex-col justify-center items-center" name="Text1" cols="40" rows="5" placeholder={placeholder} />

    </>
}