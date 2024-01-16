import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export const WordList = () => {
	const wordData = useSelector((state: RootState) => state.word);

	return (
		<div className="container mx-auto">
			<ul className="flex flex-wrap -m-2">
				{wordData.data.map((word) => (
					<li key={word.id} className="w-full xl:w-1/3 md:w-1/2 p-2">
						<div className="border border-gray-200 p-3 rounded-lg flex flex-wrap items-center justify-between">
							<div className="flex items-center gap-4 w-3/4">
								{/* <div className={memoryColor}>
                                  <img src={memoryImageUrl} alt="" className="w-5 h-5" />
                                </div> */}
								<div className="w-4/5">
									<p className="text-lg text-gray-900 font-medium title-font break-words mb-1">
										{word.word_en}
									</p>
									{/* <Answer {...otherProps} /> */}
								</div>
							</div>
							<div className="w-1/4">
								<div className="text-right">
									{/* <Update
                                    onUpdateSuccess={onUpdateSuccess}
                                    data={otherProps}
                                  /> */}
								</div>
								<div className="text-right mt-2">
									{/* <Delete word_id={otherProps.word_id} onDelete={onDelete} /> */}
								</div>
							</div>
							<div className="w-full text-right mt-3">
								<p className="text-sm">登録日：{word.created_at}</p>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};
