// import styles from './Styles.module.scss';
// import React, { useEffect, useRef, useCallback } from 'react';

// const Modal = ({
//   show,
//   onClose,
//   backdropStyles,
//   modalStyles,
//   children,
// }) => {
//   const modalRef = useRef<HTMLElement>();
//   useEffect(() => {
//     //  add when mounted
//     document.addEventListener('mousedown', handleClick);
//     //  clean on unmount
//     return () => {
//       document.removeEventListener('mousedown', handleClick);
//     };
//   }, []);
//   const handleClick = useCallback((e) => {
//     // clicked inside the modal
//     if (modalRef?.current?.contains(e.target)) {
//       return;
//     }
//     // outside the modal
//     onClose();
//   }, []);

//   return (
//     <div className="duration-700 ease-in-out justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
//         <div className="relative w-auto my-6 mx-auto max-w-3xl">
//             <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
//                 <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
//                     <h3 className="text-3xl font-semibold">
//                         Upload course material
//                     </h3>
//                     <button
//                         className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
//                         onClick={() => onClose()}
//                     >
//                         <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
//                         ×
//                         </span>
//                     </button>
//                     </div>
//                     {/*body*/}
//                     <div className="relative p-6 flex-auto">
//                         <form encType='multipart/form-data' action='POST'>
//                             <div className="mb-6">
//                                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
//                                     Title*
//                                 </label>
//                                 <input 
//                                     className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
//                                     id="title"
//                                     name='title'
//                                     type="text"
//                                     value={courseMaterial.title}
//                                     placeholder="Title of the resource" 
//                                     onChange={(e) => setCourseMaterial({ ...courseMaterial, title: e.currentTarget.value})}
//                                     required/>
//                             </div>
//                             <div className="mb-6">
//                                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
//                                     Description*
//                                 </label>
//                                 <textarea 
//                                     className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
//                                     id="description" 
//                                     name='description'
//                                     value={courseMaterial.description}
//                                     placeholder="Description of the resource" 
//                                     onChange={(e) =>setCourseMaterial({ ...courseMaterial, description: e.currentTarget.value})}
//                                     required></textarea>
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="courseMaterial">
//                                     Course Material*
//                                 </label>
//                                 <input 
//                                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
//                                     id="courseMaterial" 
//                                     name='courseMaterial'
//                                     type="file" 
//                                     accept='.docx,.pdf'
//                                     placeholder="Upload course material" 
//                                     onChange={(e) => { 
//                                         const file = e.currentTarget.files[0];
//                                         setCourseMaterial({ ...courseMaterial, file: file })
//                                     }}
//                                     required/>
//                             </div>
                            
//                         </form>
//                     </div>
//                     {/*footer*/}
//                     <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
//                     <button
//                         className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                         type="button"
//                         onClick={() => closeModal()}
//                     >
//                         Close
//                     </button>
//                     <button
//                         className="bg-indigo-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                         type="button"
//                         onClick={() => addMaterial()}
//                     >
//                         Add
//                     </button>
//                     </div>
//                 </div>
//                 </div>
//             </div>
//   );
// };


// export default Modal;
