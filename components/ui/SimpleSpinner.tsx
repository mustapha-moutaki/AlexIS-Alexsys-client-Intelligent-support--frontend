export default function SimpleSpinner(){
   return (
      <div className="h-full w-full flex items-center justify-center bg-transparent">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#51c2de]"></div>
      </div>
    );
}