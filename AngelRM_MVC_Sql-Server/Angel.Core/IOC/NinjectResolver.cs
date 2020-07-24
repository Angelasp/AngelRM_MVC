using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
//using System.Web.Mvc;
using Ninject;
using System.Web.Http.Dependencies;

namespace Angel.Core.IOC
{
    public class NinjectResolver :NinjectScope , IDependencyResolver
    {
        protected IKernel _kernel;
        public NinjectResolver(IKernel kernel)
            : base(kernel)
        {
            _kernel = kernel;
        }
        public IDependencyScope BeginScope()
        {
            return new NinjectScope(_kernel.BeginBlock());
        }


        //public virtual void AddBind() { }
        //public object GetService(Type serviceType)
        //{
        //    return this._kernel.TryGet(serviceType);
        //}

        //public IEnumerable<object> GetServices(Type serviceType)
        //{
        //    return this._kernel.GetAll(serviceType);
        //}
    }
}
