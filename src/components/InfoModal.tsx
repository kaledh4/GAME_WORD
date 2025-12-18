import Close from "./icons/Close";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    type: "settings" | "menu" | null;
}

const InfoModal = ({ isOpen, onClose, type }: Props) => {
    if (!isOpen || !type) return null;

    const getContent = () => {
        if (type === "settings") {
            return (
                <div className="w-full flex flex-col items-center text-center">
                    <h2 className="text-2xl font-bold mb-6 text-brand-charcoal">عن اللعبة</h2>

                    <div className="bg-brand-sand/10 p-6 rounded-2xl mb-6 w-full">
                        <p className="text-brand-charcoal/80 leading-relaxed mb-4 font-medium">
                            كلمة هي لعبة تخمين كلمات عربية يومية. حاول اكتشاف الكلمة الصحيحة في 6 محاولات.
                        </p>
                        <p className="text-sm text-brand-charcoal/60 italic">
                            "لتسهيل محاولاتك، إليك بعض الكلمات المقترحة التي تغطي مجموعة واسعة من الحروف:"
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 w-full mb-6">
                        {["ا ي م ن", "س ل و ك", "ت ه د ف", "ب ر ق ع"].map((word, i) => (
                            <div key={i} className="bg-white border border-brand-charcoal/10 p-3 rounded-xl font-bold text-lg shadow-sm">
                                {word}
                            </div>
                        ))}
                    </div>

                    <p className="text-xs text-brand-charcoal/40">
                        استخدم هذه الكلمات في البداية لتضييق نطاق البحث عن الحروف الصحيحة.
                    </p>
                </div>
            );
        }

        if (type === "menu") {
            return (
                <div className="w-full flex flex-col items-center text-center">
                    <h2 className="text-2xl font-bold mb-6 text-brand-charcoal">كيف تعمل؟</h2>

                    <div className="bg-brand-sage/10 p-6 rounded-2xl mb-4 w-full">
                        <h3 className="font-bold text-brand-sage mb-3 flex items-center justify-center">
                            <span className="ml-2">🪄</span> المساعدة السحرية
                        </h3>
                        <p className="text-brand-charcoal/80 leading-relaxed text-sm">
                            عندما تشعر بالحيرة، يمكنك الضغط على زر المساعدة السحرية. ستقوم اللعبة تلقائياً باختيار مكان لم تكتشفه بعد وتضع فيه الحرف الصحيح المناسب له.
                        </p>
                        <p className="mt-3 text-xs font-bold text-brand-charcoal/70">
                            ملاحظة: استخدام المساعدة السحرية يعني أنك لن تحصل على درجة كاملة في هذه الجولة!
                        </p>
                    </div>

                    <div className="bg-brand-muted-blue/10 p-6 rounded-2xl mb-8 w-full">
                        <h3 className="font-bold text-brand-muted-blue mb-3 flex items-center justify-center">
                            <span className="ml-2">🏎️</span> ميزة التسريع
                        </h3>
                        <p className="text-brand-charcoal/80 leading-relaxed text-sm">
                            تقوم ميزة التسريع بتجربة 4 كلمات استراتيجية تلقائياً لتوفير الوقت والجهد في بداية اللعبة.
                        </p>
                        <p className="mt-3 text-xs font-bold text-brand-charcoal/70">
                            ملاحظة: هذه الميزة لا تؤثر على الدرجة النهائية.
                        </p>
                    </div>

                    <div className="border-t border-brand-charcoal/5 pt-6 w-full">
                        <p className="text-sm text-brand-charcoal/40 mb-1">تم التطوير بواسطة</p>
                        <p className="text-lg font-black text-brand-charcoal tracking-wider">MUXD22</p>
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4 transition-opacity duration-300"
            onClick={onClose}
        >
            <div
                className="w-full max-w-sm bg-white rounded-3xl shadow-2xl z-[70] p-8 animate-slide-up relative"
                dir="rtl"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-6 left-6 text-brand-charcoal/20 hover:text-brand-charcoal transition-colors"
                    onClick={onClose}
                >
                    <Close />
                </button>
                {getContent()}
            </div>
        </div>
    );
};

export default InfoModal;
