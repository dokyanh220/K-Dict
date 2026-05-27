import { AlertTriangle } from './icons'

function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Glassmorphism Blur Layer */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-[12px] transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content Card */}
      <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-[#161E2E] border border-primary/15 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div className="px-6 pb-6 pt-8 sm:p-8">
          <div className="sm:flex sm:items-start">
            {/* Icon */}
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-950/20 sm:mx-0 sm:h-10 sm:w-10 ring-1 ring-red-500/30">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            {/* Text Content */}
            <div className="mt-4 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 className="font-headline text-xl font-semibold text-foreground" id="modal-title">
                Đăng xuất
              </h3>
              <div className="mt-2">
                <p className="text-sm text-muted-foreground">
                  Bạn có chắc chắn muốn đăng xuất?
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="bg-background/40 px-6 py-4 sm:flex sm:flex-row-reverse sm:px-8 border-t border-primary/15">
          <button
            onClick={onConfirm}
            className="inline-flex w-full justify-center rounded-lg bg-red-500/80 hover:bg-red-650 px-4 py-2 text-sm font-medium text-white shadow-sm hover:-translate-y-[2px] hover:scale-[1.02] hover:shadow-[0_0_12px_rgba(239,68,68,0.2)] ring-1 ring-red-500/20 transition-all duration-200 sm:ml-3 sm:w-auto"
            type="button"
          >
            Đăng xuất
          </button>
          <button
            onClick={onClose}
            className="mt-3 inline-flex w-full justify-center rounded-lg bg-transparent px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm ring-1 ring-inset ring-primary/15 hover:bg-primary/5 hover:text-foreground transition-all duration-200 sm:mt-0 sm:w-auto"
            type="button"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  )
}

export default LogoutModal
